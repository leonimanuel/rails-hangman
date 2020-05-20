class ChallengeSerializer
	def initialize(challenge_obj)
		@challenge = challenge_obj
	end

	def to_serialized_json
		options = {
			except: [:user_id, :recipient_id],
			include: {
				recipient: {
					only: [:name]
				}
			}
		}
		@challenge.to_json(options)
	end
end