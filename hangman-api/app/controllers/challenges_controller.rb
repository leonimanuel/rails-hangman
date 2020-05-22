class ChallengesController < ApplicationController
	def show
		# binding.pry
		challenge = Challenge.find(params[:id])
		render json: ChallengeSerializer.new(challenge).to_serialized_json
	end

	def create
		# binding.pry
		challenge = Challenge.new(
			recipient: User.find_by(name: params[:challenge][:recipient_name]),
			content: params[:challenge][:phrase], 
			hint: params[:challenge][:hint],
			user: User.find(params[:challenge][:user_id])
		)
		# binding.pry
		if challenge.valid?
			challenge.save
			# phrase = Phrase.create(content: params[:challenge][:phrase], hint: params[:challenge][:hint])
			redirect_to challenge_path(challenge)	
		else
			render json: { errors: "Please enter a valid username" }, status: 422
		end
	end

	def update
		challenge = Challenge.find(params[:id])
		challenge.update(solved: params[:solved], result: params[:result])
		# render json: ChallengeSerializer.new(challenge).to_serialized_json
		redirect_to user_path(challenge.recipient)
	end

	private 

	# def challenge_params
	# 	params.require(:challenge).permit(:recipient_name, :phrase, :hint, :user_id)
	# end
end
