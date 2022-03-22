require 'json'

class TodosController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :set_project
  before_action :set_todo, except: [:create]

  # POST /projects/:project_id/todos
  def create
    @todo = @project.todos.new(todo_params)

    if @todo.save
      render json: @todo, status: :created
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # PATCH /projects/:project_id/todos/:id
  def update
    if @todo.update(isCompleted: !@todo[:isCompleted])
      render json: @todo
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  private

  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_todo
    @todo = @project.todos.find(params[:id])
  end

  def todo_params
    params[:todo].permit(:text, :isCompleted)
  end
  
end
