// "use client";
// import React, { useState, useEffect } from "react";
// import { z } from "zod";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { toast } from "sonner";
// import {
//   fetchContacts,
//   createContact,
//   deleteContact,
//   updateContact,
//   Contact,
// } from "@/service/contactService";

// const contactSchema = z.object({
//   firstName: z.string().min(1, { message: "First Name is required." }),
//   lastName: z.string().min(1, { message: "Last Name is required." }),
//   phoneNumber: z
//     .string()
//     .min(10, { message: "Phone Number must be at least 10 digits." })
//     .max(20, { message: "Phone Number can't exceed 20 digits." }),
//   email: z.string().email({ message: "Invalid email address." }),
// });

// type ContactForm = z.infer<typeof contactSchema>;

// export default function ContactsCrud() {
//   const [contacts, setContacts] = useState<Contact[]>([]);
//   const [editingContactId, setEditingContactId] = useState<number | null>(null);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm<ContactForm>({
//     resolver: zodResolver(contactSchema),
//   });

//   const loadContacts = async () => {
//     try {
//       const data = await fetchContacts();
//       setContacts(data);
//     } catch (error) {
//       console.error("Error loading contacts:", error);
//       toast.error("Failed to load contacts.");
//     }
//   };

//   const onSubmit = async (formData: ContactForm) => {
//     try {
//       if (editingContactId) {
//         await updateContact(editingContactId, formData);
//         toast.success("Contact updated successfully!");
//       } else {
//         await createContact(formData);
//         toast.success("Contact created successfully!");
//       }
//       loadContacts();
//       reset();
//       setEditingContactId(null);
//     } catch (error) {
//       console.error("Error saving contact:", error);
//       toast.error("Failed to save contact.");
//     }
//   };

//   const handleEditContact = (contact: Contact) => {
//     setEditingContactId(contact.id as number);
//     setValue("firstName", contact.firstName);
//     setValue("lastName", contact.lastName);
//     setValue("phoneNumber", contact.phoneNumber);
//     setValue("email", contact.email);
//   };

//   const handleDeleteContact = async (id: number) => {
//     try {
//       await deleteContact(id);
//       loadContacts();
//       toast.success("Contact deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting contact:", error);
//       toast.error("Failed to delete contact.");
//     }
//   };

//   useEffect(() => {
//     loadContacts();
//   }, []);

//   return (
//     <div className="p-4 space-y-4">
//       <Card>
//         <CardHeader>
//           <h2 className="text-xl font-bold">
//             {editingContactId ? "Update Contact" : "Create Contact"}
//           </h2>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Input placeholder="First Name" {...register("firstName")} />
//                 {errors.firstName && (
//                   <p className="text-red-500 text-sm">
//                     {errors.firstName.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <Input placeholder="Last Name" {...register("lastName")} />
//                 {errors.lastName && (
//                   <p className="text-red-500 text-sm">
//                     {errors.lastName.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <Input
//                   placeholder="Phone Number"
//                   {...register("phoneNumber")}
//                 />
//                 {errors.phoneNumber && (
//                   <p className="text-red-500 text-sm">
//                     {errors.phoneNumber.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <Input placeholder="Email" {...register("email")} />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm">{errors.email.message}</p>
//                 )}
//               </div>
//             </div>
//             <Button className="mt-4" type="submit">
//               {editingContactId ? "Update Contact" : "Add Contact"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <h2 className="text-xl font-bold">Contact List</h2>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>First Name</TableHead>
//                 <TableHead>Last Name</TableHead>
//                 <TableHead>Phone Number</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {contacts.map((contact) => (
//                 <TableRow key={contact.id}>
//                   <TableCell>{contact.firstName}</TableCell>
//                   <TableCell>{contact.lastName}</TableCell>
//                   <TableCell>{contact.phoneNumber}</TableCell>
//                   <TableCell>{contact.email}</TableCell>
//                   <TableCell className="flex space-x-2">
//                     <Button
//                       variant="secondary"
//                       onClick={() => handleEditContact(contact)}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="destructive"
//                       onClick={() => handleDeleteContact(contact.id as number)}
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { fetchContacts, createContact, deleteContact, updateContact, Contact } from "@/service/contactService";

const contactSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required." }),
  lastName: z.string().min(1, { message: "Last Name is required." }),
  phoneNumber: z.string().min(10, { message: "Phone Number must be at least 10 digits." }).max(20, { message: "Phone Number can't exceed 20 digits." }),
  email: z.string().email({ message: "Invalid email address." }),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactsCrud() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingContactId, setEditingContactId] = useState<number | null>(null);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const loadContacts = async () => {
    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch (error) {
      console.error("Error loading contacts:", error);
      toast.error("Failed to load contacts.");
    }
  };

  const onSubmit = async (formData: ContactForm) => {
    try {
      if (editingContactId) {
        await updateContact(editingContactId, formData);
        toast.success("Contact updated successfully!");
      } else {
        await createContact(formData);
        toast.success("Contact created successfully!");
      }
      loadContacts();
      reset();
      setEditingContactId(null);
    } catch (error) {
      toast.error("Failed to save contact.");
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContactId(contact.id as number);
    setValue("firstName", contact.firstName);
    setValue("lastName", contact.lastName);
    setValue("phoneNumber", contact.phoneNumber);
    setValue("email", contact.email);
  };

  const handleDeleteContact = async (id: number) => {
    try {
      await deleteContact(id);
      loadContacts();
      toast.success("Contact deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete contact.");
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">{editingContactId ? "Update Contact" : "Create Contact"}</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input placeholder="First Name" {...register("firstName")} />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
              </div>
              <div>
                <Input placeholder="Last Name" {...register("lastName")} />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>
              <div>
                <Input placeholder="Phone Number" {...register("phoneNumber")} />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
              </div>
              <div>
                <Input placeholder="Email" {...register("email")} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
            </div>
            <Button className="mt-4" type="submit">{editingContactId ? "Update Contact" : "Add Contact"}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Contact List</h2>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.firstName}</TableCell>
                  <TableCell>{contact.lastName}</TableCell>
                  <TableCell>{contact.phoneNumber}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button onClick={() => handleEditContact(contact)}>Edit</Button>
                    <Button  onClick={() => handleDeleteContact(contact.id as number)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
