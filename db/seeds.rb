puts "🌱 Seeding spices..."

# Seed your database here

puts "✅ Done seeding!"

Category.create([
                  { name: 'Books' },
                  { name: 'Electronics' },
                  { name: 'Clothing' }
                ])