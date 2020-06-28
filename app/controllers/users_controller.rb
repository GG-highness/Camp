class UsersController < ApplicationController
  before_action :authenticate_user, { only: [:edit, :update, :delete, :destroy] }
  before_action :forbid_login_user, { only: [:new, :create, :login_form, :login] }
  before_action :ensure_correct_user, {only: [:edit, :update]}
  
  def show
    @user = User.find_by(id: params[:id])
  end
  
  def new
    @user = User.new
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      flash[:notice] = "ユーザー登録が完了しました"            
      redirect_to @user
    else            
      render "new"           
    end  
  end
  
  def edit
    @user = User.find_by(id: params[:id])
  end
  
  def update
    @user = User.find_by(id: params[:id])
    
    if params[:image_name]
      @user.image_name = params[:image_name]
    end
    
    if @user.update_attributes(user_update_params)
      flash[:notice] = "ユーザー情報を編集しました"
      redirect_to @user
    else
      render "edit"
    end
  end
  
  def login_form
  end
  
  def login
    @user = User.find_by(email: params[:email])

    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      flash[:notice] = "ログインしました"
      redirect_to("/")
    else
      @error_message = "メールアドレスまたはパスワードが間違っています"
      @email = params[:email]
      @password = params[:password]
      render("users/login_form")
    end
  end
  
  def simple_login
    @user = User.find_by(id: 1)

    flash[:notice] = "ログインしました"
    session[:user_id] = @user.id
    redirect_to("/")
  end
  
  def logout
    session[:user_id] = nil
    flash[:notice] = "ログアウトしました"
    redirect_to("/login")
  end
  
  def likes
    @user = User.find_by(id: params[:id])
    @likes = Like.where(user_id: @user.id)
  end
  
  def ensure_correct_user
    if @current_user.id != params[:id].to_i
      flash[:notice] = "権限がありません"
      redirect_to("/")
    end
  end
  
  
  private

    def user_params
      params.require(:user).permit(:name, :email, :password,)
    end
    
    def user_update_params
      params.require(:user).permit(:name, :email, :image_name, :profile)
    end
    
end
