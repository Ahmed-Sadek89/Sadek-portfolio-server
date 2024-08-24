import {
    Awner as awner,
    Visitor as visitor,
    Project as project,
    Activity as activity,
    CategoryProject as categoryProject,
    CategorySkill as categorySkill,
    ColorsSetting as colorsSetting,
    FuturePlan as futurePlan,
    JobTitle as jobTitle,
    LinkType as linkType,
    Link as link,
    Message as message,
    Phone as phone,
    Skill as skills,
    ProjectNote as projectNote
} from "@prisma/client";

export type Awner = awner
export type AwnerLogin = { email: string, password: string }
export type AwnerWithoutPassword = Omit<awner, 'password'>;

export type Visitor = visitor

export type Project = project

export type Activity = activity
export type ActivityCreation = Omit<activity, 'date'|"id">;

export type CategoryProject = categoryProject

export type CategorySkill = categorySkill

export type ColorsSetting = colorsSetting

export type FuturePlan = futurePlan

export type JobTitle = jobTitle

export type LinkType = linkType

export type Link = link

export type Message = message

export type Phone = phone

export type Skills = skills

export type ProjectNote = projectNote
