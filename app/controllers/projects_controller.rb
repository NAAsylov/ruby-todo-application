require 'json'

class ProjectsController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :set_project, only: %i[ show update destroy ]

  # GET /projects
  def index
    @projects = Project.select(:id, :title).all
    @result = []
    @projects.each do |project|
      @todos = project.todos.select(:id, :text, :isCompleted).all
      @project = project.as_json
      @project["todos"] = @todos.as_json
      @result.push(@project)
    end

    render json: @result
  end

  # POST /projects
  def create
    @project = Project.new(project_params)

    if @project.save
      render json: @project, status: :created
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  def project_params
    params[:project].permit(:title)
  end

end
