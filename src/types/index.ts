import { z } from "zod"

// AUTH
export const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ResetPasswordForm = Pick<Auth, 'email'>
export type NewPasswordFormType = Pick<Auth, 'password' | 'password_confirmation'>
export type ConfirmToken = Pick<Auth, 'token'>
export type CheckPasswordForm = Pick<Auth, 'password'>
export type UpdateProfile = Pick<Auth, 'name' | 'email'>


// USER
export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
})

export type User = z.infer<typeof userSchema>



// TEAM
export const teamMemberSchema = userSchema.pick({
   _id: true,
   name: true,
   email: true
})

export const teamMembersSchema = z.array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>



// NOTES
export const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema.pick({_id: true, name: true}),
    task: z.string(),
    createdAt: z.string()
})

export type Note = z.infer<typeof noteSchema>
export type NoteForm = Pick<Note, 'content'>


//TASKS
const taskStatusSchema = z.enum(['pending', 'inProgress', 'underReview', 'completed'])
export type taskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
    _id: z.string(),
    title: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
    completedBy: z.array(z.object({
        _id: z.string(),
        user: userSchema.pick({_id: true, name: true}),
        status: taskStatusSchema
    })),
    notes: z.array(noteSchema)
})

export const taskProjectSchema = taskSchema.pick({
    _id: true,
    title: true,
    description: true,
    status: true
})

export type Task = z.infer<typeof taskSchema>
export type TaskProject = z.infer<typeof taskProjectSchema>
export type TaskForm = Pick<Task, 'title' | 'description'>





// PROJECTS
export const projectSchema = z.object({
    _id: z.string(),
    title: z.string(),
    description: z.string(),
    manager: z.string(),
    tasks: z.array(taskProjectSchema),
    team: z.array(z.string(userSchema.pick({_id: true})))
})

export const dashboardProjectsSchema = z.array(
    projectSchema.pick({
        _id: true,
        title: true,
        description: true,
        manager: true
    }).extend({
        tasks: z.array(z.string()),
        team: z.array(z.string())
    })
)

export const dashboardProjectSchema = 
    projectSchema.pick({
        _id: true,
        title: true,
        description: true,
        manager: true
    }).extend({
        tasks: z.array(z.string()),
        team: z.array(z.string())
    })


export type Project = z.infer<typeof projectSchema>
export type DashboardProjectType = z.infer<typeof dashboardProjectSchema>
export type ProjectForm = Pick<Project, 'title' | 'description'>











