# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
billy = User.create(name: "Billy", email: "billy@aol.com", password: "greenbeans")
claire = User.create(name: "Claire", email: "claire@gmail.com", password: "fishsticks")
ashley = User.create(name: "Ashley", email: "ashley@yahoo.com", password: "milkmaid")
megan = User.create(name: "Megan", email: "megan@aol.com", password: "greenbeans")
ben = User.create(name: "Ben", email: "ben@gmail.com", password: "fishsticks")
luke = User.create(name: "Luke", email: "luke@yahoo.com", password: "milkmaid")

movies = Category.create(name: "Movies")
animals = Category.create(name: "Animals")
geography = Category.create(name: "Geography")

action = Subcategory.create(name: "Action", category: movies)
comedy = Subcategory.create(name: "Comedy", category: movies)
drama = Subcategory.create(name: "Drama", category: movies)

birds = Subcategory.create(name: "Birds", category: animals)
megafauna = Subcategory.create(name: "Megafauna", category: animals)
reptiles = Subcategory.create(name: "Reptiles", category: animals)

state_capitals = Subcategory.create(name: "State Capitals", category: geography)
countries = Subcategory.create(name: "Countries", category: geography)
landmarks = Subcategory.create(name: "Landmarks", category: geography)

phrase1 = Phrase.create(content: "pidgeon", hint: "coo", subcategory: birds);
phrase2 = Phrase.create(content: "eagle", hint: "valor", subcategory: birds);
phrase3 = Phrase.create(content: "raven", hint: "caw", subcategory: birds);

Phrase.create(content: "The Big Lebowski", hint: "Nice marmot.", subcategory: comedy);
Phrase.create(content: "In Bruges", hint: "You've got to stick to your principles.", subcategory: comedy);
Phrase.create(content: "The Princess Bride", hint: "You're trying to kidnap what I've rightfully stolen.", subcategory: comedy);
Phrase.create(content: "Napolean Dynamite", hint: "Vote for Pedro.", subcategory: comedy);
Phrase.create(content: "Dr Strangelove Or How I Learned to Stop Worrying and Love the Bomb", hint: "You're gonna have to answer to the Coca-Cola company.", subcategory: comedy);


Challenge.create(content: "Rampage", hint: "George", user: User.find(1), recipient: User.find(4))
Challenge.create(content: "Bon viv", hint: "spiked seltzer", user: megan, recipient: billy)
Challenge.create(content: "Charlie", hint: "Güt boy", user: billy, recipient: User.find(2))
Challenge.create(content: "The Feed", hint: "Fundle my mundles", user: ashley, recipient: billy, solved: false, result: "WIN")
Challenge.create(content: "Fleabag", hint: "Fleas", user: billy, recipient: User.find(2))
Challenge.create(content: "Catcher in the Rye", hint: "Holden", user: claire, recipient: billy, solved: true, result: "LOSE")
Challenge.create(content: "Inception", hint: "We have to go deeper.", user: billy, recipient: User.find(3))
Challenge.create(content: "Sharknado", hint: "A phenomenal cinematic masterpiece", user: megan, recipient: User.find(3))










