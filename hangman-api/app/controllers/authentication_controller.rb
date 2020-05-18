class AuthenticationController < ApplicationController
	def login
		# binding.pry
		if user = User.find_by(email: params[:email])
			if user.authenticate(params[:password])
				redirect_to user_path(user)
			else
				render json: { message: "email and password do not match existing user" }
			end
		end
	end
end
