class AuthenticationController < ApplicationController
	def login
		# binding.pry
		if params[:name] != ""
			user = User.new(
				name: params[:name],
				email: params[:email], 
				password: params[:password]			
			)
			if user.valid?
				user.save
				redirect_to user_path(user)
			else
				render json: { message: user.errors}
			end
		elsif user = User.find_by(email: params[:email])
			if user.authenticate(params[:password])
				redirect_to user_path(user)
			else
				render json: { message: "email and password do not match existing user" }
			end
		end
	end
end
