class User < ApplicationRecord
	has_secure_password

	has_many :sent_challenges, class_name: "Challenge", foreign_key: "user_id"
	has_many :received_challenges, class_name: "Challenge", foreign_key: "recipient_id"
end
