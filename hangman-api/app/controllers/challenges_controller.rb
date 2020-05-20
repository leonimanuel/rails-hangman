class ChallengesController < ApplicationController
	def create
		# binding.pry
		challenge = Challenge.new(
			recipient: User.find_by(name: params[:challenge][:recipient_name]),
			phrase: params[:challenge][:phrase], 
			hint: params[:challenge][:hint],
			user: User.find(params[:challenge][:user_id])
		)
		if challenge.valid?
			challenge.save
			redirect_to challenge_path(challenge)	
		else
			render json: { errors: challenge.errors }, status: 422
		end
	end

	def show
		binding.pry
		challenge = Challenge.find(params[:id])
		render json: ChallengeSerializer.new(challenge).to_serialized_json
	end

	private 

	# def challenge_params
	# 	params.require(:challenge).permit(:recipient_name, :phrase, :hint, :user_id)
	# end
end
