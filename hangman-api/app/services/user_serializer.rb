class UserSerializer 
	def initialize(user_obj)
		@user = user_obj
	end

	def to_serialized_json
		options = {
			except: [:updated_at, :created_at]
		}

		@user.to_json(options)
	end
end