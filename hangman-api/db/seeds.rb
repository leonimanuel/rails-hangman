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








