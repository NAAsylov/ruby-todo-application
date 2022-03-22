seed_file = Rails.root.join('db', 'seeds.yml')
config = YAML::load_file(seed_file)

config["projects"].each do |project|
  @project = Project.create({title: project["title"]})
  project["todos"].each do |todo|
    @project.todos.create(todo)
  end
end