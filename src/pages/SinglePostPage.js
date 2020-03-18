import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPost } from "../slices/posts";
import { fetchComments } from "../slices/comments";
import { Post } from "../components/Post";
import { Comment } from "../components/Comment";

const SinglePostPage = ({ match }) => {
  const dispatch = useDispatch();
  const {
    post,
    isLoading: postLoading,
    hasErrors: postHasErrors
  } = useSelector(state => state.posts);
  const {
    comments,
    isLoading: commentsLoading,
    hasErrors: commentsHasErrors
  } = useSelector(state => state.comments);

  useEffect(() => {
    const { id } = match.params;

    dispatch(fetchComments(id));
    dispatch(fetchPost(id));
  }, [dispatch, match]);

  const renderPost = () => {
    if (postLoading) return <p>Loading post...</p>;
    if (postHasErrors) return <p>Unable to display post.</p>;

    return <Post post={post} />;
  };

  const renderComments = () => {
    if (commentsLoading) return <p>Loading comments...</p>;
    if (commentsHasErrors) return <p>Unable to display comments.</p>;

    return comments.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ));
  };

  return (
    <section>
      {renderPost()}
      <h2>Comments</h2>
      {renderComments()}
    </section>
  );
};

export default SinglePostPage;
