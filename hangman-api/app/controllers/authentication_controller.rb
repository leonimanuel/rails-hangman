class AuthenticationController < ApplicationController
	def login
		binding.pry
		if user = User.find_by(email: params[:email])
			if user.authenticate(params[:password])
				redirect_to user_path(user)
			end
		end
	end
end
