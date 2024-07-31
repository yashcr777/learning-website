"use client"


import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema=z.object({
    title:z.string().min(1,{
        message:"Title is required",
    }),
});

interface TitleFormProps{
    initialData:{
        title:string;
    };
    courseId:string;
}



export const TitleForm=({
    initialData,
    courseId
}:TitleFormProps)=>{

    const [isEditing,setIsEditing]=useState(false);
    const toggleEdit =()=>setIsEditing((current)=>!current);
    const router =useRouter();

    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData,
    });
    const {isSubmitting,isValid}=form.formState;
    const onSubmit=async (values:z.infer<typeof formSchema>)=>{
        try{
            await axios.patch(`/api/courses/${courseId}`,values);
            toast.success("Course Updated");
            toggleEdit();
            router.refresh();
        }
        catch{
            toast.error("Something went Wrong")
        }
    }
    return (
        <div className="mt-6 bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Title
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing &&(
                        <>Cancel</>
                    )}
                    {!isEditing&&(
                        <>
                        <Pencil className="h-4 w-4 mr-2"/>
                        Edit Title
                        </>
                    )}
                    
                </Button>
            </div>
            {!isEditing &&(
                <p className="text-sm mt-2">
                    {initialData.title}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control={form.control}
                        name="title"
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input
                                    disabled={isSubmitting}
                                    placeholder="e.g. 'Advanced web development'"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid || isSubmitting} type="submit">
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}