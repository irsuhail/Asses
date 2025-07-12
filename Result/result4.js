const feedbacks = [
  { userId: "U1", ratings: [4, 5, 5], comments: ["Great", "Loved it", "Best app"] },
  { userId: "U2", ratings: [2, 3], comments: ["Okay", "Needs improvement"] },
  { userId: "U3", ratings: [5, 5, 5, 4, 5], comments: ["Fantastic", "Brilliant"] },
  { userId: "U4", ratings: [1, 2], comments: ["Bad UI", "Slow"] },
  { userId: "U5", ratings: [4, 4, 4], comments: ["Good", "Decent"] },
];

const result = feedbacks
  .map(({ userId, ratings, comments }) => {
    const averageRating = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    return {
      userId,
      averageRating,
      totalComments: comments.length
    };
  })
  .filter(user => user.averageRating >= 4.5)
  .sort((a, b) => b.averageRating - a.averageRating);

console.log(result);
