"use client"

import * as z from "zod";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import { useRouter } from "next/router";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema=z.object({
    title:z.string().min(1,{
        message:"title is required",
    }),
});

const CreatePage = () => {
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            title:""
        },
    });
    const {isSubmitting,isValid}=form.formState;

    const onSubmit=(values:z.infer<typeof formSchema>)=>{
        console.log(values)
    }
    return ( 
        <div className="max-w-5xl mx-auto">
            Create Page!
        </div>
     );
}
 
export default CreatePage;