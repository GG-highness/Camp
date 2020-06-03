class PostsController < ApplicationController
  before_action :authenticate_user, { only: [:new, :create, :edit, :update, :destroy] }
  before_action :ensure_correct_user, {only: [:edit, :update, :destroy]}
  
  def index
    @posts = Post.all.order(created_at: :desc)
  end
  
  def show
    @post = Post.find_by(id: params[:id])
    @user = @post.user
    @likes_count = Like.where(post_id: @post.id).count
    @photos = @post.photos.all
  end
  
  def new
    @post = Post.new
    @post.photos.new
  end
  
  def create
    @post = Post.new(post_params)
    
    if @post.save
      flash[:notice] = "投稿を作成しました"
      redirect_to("/")
    else
      render("posts/new")
    end
  end
  
  def edit
    @post = Post.find_by(id: params[:id])
  end
  
  def update
    @post = Post.find_by(id: params[:id])
    
    if @post.update(update_post_params)
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
  
  private
    def post_params
      params.require(:post).permit(:content, photos_attributes: [:post_image])
    end
end
