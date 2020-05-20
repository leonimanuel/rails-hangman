class ChallengesController < ApplicationController
	def create
		binding.pry
		challenge = Challenge.new(
			recipient: User.find_by(name: params[:challenge][:recipient_name]),
			phrase: params[:challenge][:phrase], 
			hint: params[:challenge][:hint],
			user: User.find(params[:challenge][:user_id])
		)
		if user.valid?
			redirect_to challenge_path(challenge)	
		end
	end

	def show
		challenge = Challenge.find(params[:id])
		render json: ChallengeSerializer.new(challenge).to_serialized_json
	end

	private 

	# def challenge_params
	# 	params.require(:challenge).permit(:recipient_name, :phrase, :hint, :user_id)
	# end
end
