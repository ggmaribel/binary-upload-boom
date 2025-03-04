const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      // const commentUser = await User.findById(req.params.id);
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        createdBy: req.user.userName, 
        createdById: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      // let post = await Comment.findById({ _id: req.params.id });
      // Delete comment from db
      await Comment.deleteOne({ _id: req.params.commentId });
      console.log("Deleted Comment");
      res.redirect("/post/"+req.params.postId);
    } catch (err) {
      res.redirect("/post/"+req.params.id);
    }
  },
};
