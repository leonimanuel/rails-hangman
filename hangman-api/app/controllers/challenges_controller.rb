class ChallengesController < ApplicationController
	def create
		binding.pry
		challenge = Challenge.new(
			recipient: User.find_by(name: params[:challenge][:recipient_name]),
			phrase: params[:challenge][:phrase], 
			hint: params[:challenge][:hint],
			user: User.find(params[:challenge][:user_id])
		)
		# if user.valid?
			
		# end
		

		# binding.pry
	end



	private 

	def challenge_params
		params.require(:challenge).permit(:recipient_name, :phrase, :hint, :user_id)
	end
end
