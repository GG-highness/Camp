class CommentsController < ApplicationController
  before_action :authenticate_user
  before_action :ensure_correct_user, { only: [:edit, :update, :destroy] }
  
  def create
    @post = Post.find_by(params[:post_id])
    @comment = @post.comments.build(comment_params)
    @comment.user_id = @current_user.id
    @comment.save
    render :index
  end

  private
    def comment_params
      params.require(:comment).permit(:body).merge(user_id: @current_user.id, post_id: @post_id)
    end
end
