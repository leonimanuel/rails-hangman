class UsersController < ApplicationController
	def show
		# binding.pry
		user = User.find(params[:id])
		render json: UserSerializer.new(user).to_serialized_json
	end

	def update
		user = User.find(params[:id])
		if params[:result] == "win"
			user.wins += 1
		elsif params[:result] == "lose"
			user.losses += 1
		end
		user.save
		binding.pry
		render json: UserSerializer.new(user).to_serialized_json
	end
end
