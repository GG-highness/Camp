require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#create' do
    #############################
    # 保存NG確認                 #
    #############################
    context 'can not save' do
      it "[name] nil" do
        user = build(:user, name: nil)
        user.valid?
        expect(user.errors.messages[:name]).to include("を入力してください")
      end

      it "[name] max" do
        user = build(:user, name: "abcdefghi")
        user.valid?
        expect(user.errors.messages[:nickname]).to include("は 8文字以下で入力してください")
      end

      it "[email] nil" do
        user = build(:user, email: nil)
        user.valid?
        expect(user.errors.messages[:email]).to include("を入力してください")
      end

      it "[email] duplication" do
        user = create(:user, email: "test@test.test")
        user = build(:user, email: "test@test.test")
        user.valid?
        expect(user.errors.messages[:email]).to include("はすでに存在します")
      end
    end

    #############################
    # 保存OK確認                 #
    #############################
    context 'can save' do
      it "[user] all ok" do
        user = build(:user)
        user.valid?
        expect(user).to be_valid
      end

      it "[name] max" do
        user = build(:user, nickname: "abcdefgh")
        user.valid?
        expect(user).to be_valid
      end
    end
  end
end
