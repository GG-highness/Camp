class UsersController < ApplicationController
  
  def show
    @user = User.find_by(id: params[:id])
  end
  
  def new
  end
  
  def create
    @user = User.new(name: params[:name], 
                     email: params[:email],
                     image_name: "default_user.jpg"
                     )
    if @user.save
      flash[:notice] = "ユーザー登録が完了しました"            
      redirect_to("/users/#{@user.id}")            
    else            
      render("users/new")            
    end  
  end
  
  def edit
    @user = User.find_by(id: params[:id])
  end
  
  def update
    @user = User.find_by(id: params[:id])
    @user.name = params[:name]
    @user.email = params[:email]
    
    if params[:image]
      @user.image_name = params[:image]
    end
    
    if @user.save
      flash[:notice] = "ユーザー情報を編集しました"
      redirect_to("/users/#{@user.id}")
    else
      render("users/edit")
    end
  end
  
  def login_form
  end
  
  def login
    @user = User.find_by(email: params[:email], password: params[:password])

    if @user
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
  
end
