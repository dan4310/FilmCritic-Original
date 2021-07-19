import { IResolvers } from "@graphql-tools/utils";
import * as bcrypt from 'bcryptjs';
import { Likes } from "../../entity/Likes";
import { Reviews } from "../../entity/Reviews";
import { Users } from "../../entity/User";

export const resolvers: IResolvers = {
Query: {
    hello: (_: any, { name }: any) => `Hello ${name || 'World'}`,
    users: async (_: any, {  }: any) => {
        const users = await Users.find({ 
            relations: ["reviews", "likedReviews", "reviews.author", "likedReviews.review", "likedReviews.user"],
    });
        return users;
    },
    user: async (_: any, { id }: any ) => {
        const user = await Users.findOne({ where: {id: id}, relations: ["reviews", "likedReviews", "likedReviews.review", "likedReviews.user"]});
        return user;
    },
    reviews: async(_: any, { }: any) => {
        const reviews = await Reviews.find({ relations: ["author", "likes", "likes.user"] });
        reviews.sort((a,b) => b.likes.length - a.likes.length);
        return reviews;
    },
    reviewsById: async (_: any, { movieId }: any) => {
        const reviews = await Reviews.find({ where: {movieId: movieId}, relations: ["author", "likes", "likes.user"]});
        return reviews;
    },
    likes: async(_: any, { }: any) => {
        const likes = await Likes.find({ relations: ["review", "user"] });
        return likes;
    },
    login: async(_: any, { username, password }: any) => {        
        const user = await Users.findOne({
            where: { username: username },
            relations: ["reviews", "likedReviews"]
        });

        if (!user) throw new Error("User doesn't exist");
    
        const isCorrect = bcrypt.compareSync(password, user.password);
        if (isCorrect) return user;

        throw new Error("Wrong password");
    }
},
Mutation: {
      register: async (_: any, { email, password, username, firstName, lastName, created }: any) => {
        const hash = await bcrypt.hash(password, 10);
        if (!firstName) {
            firstName = ''
        }
        if (!lastName) {
            lastName = ''
        }
        const user = Users.create({
            email,
            password: hash,
            username,
            firstName,
            lastName,
            created: created || new Date(),
        });
        await user.save();
        return user;
      },
      createReview: async (_: any, { description, movieId, rating, authorId }: any) => {
        const review = Reviews.create({
            description,
            movieId,
            rating,
            created: new Date(),
        });
        const author = await Users.findOne({ where: { id: authorId }});
        
        if (author) {
            await author.save();
            review.author = author
            review.likes = [];
        }
        
        await review.save();
        return review;
      },

      likePost: async (_: any, { userId, reviewId }: any) => {
        
        const user = await Users.findOne({ where: {id: userId }});
        const review = await Reviews.findOne({ where: {id: reviewId}});
        console.log(review);
        const like = Likes.create({
            user: user,
            review: review,
            created: new Date().toISOString(),
        });

        await like.save();
        return like;
      },
      deleteLike: async (_: any, { userId, reviewId }: any) => {
          const like = await Likes.findOne({ where: {userId: userId, reviewId: reviewId}});
          const user = await Users.findOne({ where: {id: userId}, relations: ["likedReviews"]});
          if (user) {
            console.log(user.likedReviews); 
            const likedReviewIndx = user.likedReviews.findIndex(review => review.id === reviewId);
            if (likedReviewIndx >= 0) {
                user.likedReviews = user.likedReviews.splice(likedReviewIndx, 1);
                await user.save();
            }
          }
          await Likes.delete({ userId: userId, reviewId: reviewId });
          return like;
      }

  }
}