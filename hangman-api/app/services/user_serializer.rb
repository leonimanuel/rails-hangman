class UserSerializer 
	def initialize(user_obj)
		@user = user_obj
	end

	def to_serialized_json
		options = {
			include: {
				sent_challenges: {
					except: [:user_id, :recipient_id],
					include: {
						recipient: { 
							only: [:name] 
						}
					}
				},
				received_challenges: {
					except: [:user_id, :recipient_id],
					include: {
						user: {
							only: [:name]
						}
					}
				}
			},
			except: [:updated_at, :created_at, :password_digest]
		}

		@user.to_json(options)
	end
end