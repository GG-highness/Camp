class PostsController < ApplicationController
  before_action :authenticate_user, { only: [:new, :create, :edit, :update, :destroy] }
  before_action :ensure_correct_user, {only: [:edit, :update, :destroy]}
  
  def index
    @posts = Post.all.order(created_at: :desc).page(params[:page]).per(8)
  end
  
  def show
    @post = Post.find_by(id: params[:id])
    @user = @post.user
    @likes_count = Like.where(post_id: @post.id).count
    @photos = Photo.where(post_id: @post.id).order(created_at: :desc)
    @photos_count = Photo.where(post_id: @post.id).count
    @comments = Comment.where(post_id: @post.id)
    @comment = @post.comments.build
  end
  
  def new
    @post = Post.new
    @post.photos.build()
  end
  
  def create
    @post = Post.new(post_params)
    
    if @post.save
      flash[:notice] = "投稿を作成しました"
      redirect_to("/")
    end
  end
  
  def edit
    @post = Post.find_by(id: params[:id])
  end
  
  def update
    @post = Post.find_by(id: params[:id])
    @post.content = params[:content]
    if @post.save
      flash[:notice] = "投稿を編集しました"
      redirect_to("/")
    else
      render("posts/edit")
    end
  end
  
  def destroy
    @post = Post.find_by(id: params[:id])
    @post.destroy
    flash[:notice] = "投稿を削除しました"
    redirect_to("/")
  end

  def ensure_correct_user
    @post = Post.find_by(id: params[:id])
    if @post.user_id != @current_user.id
      flash[:notice] = "権限がありません"
      redirect_to("/posts/index")
    end
  end
  
  def post_params
    params.require(:post).permit(:content, photos_attributes: [:post_image]).merge(user_id: @current_user.id)
  end
  
end