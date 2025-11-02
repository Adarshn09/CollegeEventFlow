import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertRegistrationSchema } from "@shared/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const registrationFormSchema = insertRegistrationSchema.extend({
  studentEmail: z.string().email("Invalid email address").regex(/.+@.+\.edu$/i, "Must be a .edu email"),
});

type RegistrationFormData = z.infer<typeof registrationFormSchema>;

interface RegistrationFormProps {
  eventId: string;
  eventTitle: string;
  onSuccess?: () => void;
}

export function RegistrationForm({ eventId, eventTitle, onSuccess }: RegistrationFormProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      eventId,
      studentName: "",
      studentEmail: "",
      studentId: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    form.reset({
      eventId,
      studentName: "",
      studentEmail: "",
      studentId: "",
      phoneNumber: "",
    });
    setIsRegistered(false);
  }, [eventId, form]);

  const registrationMutation = useMutation({
    mutationFn: async (data: RegistrationFormData) => {
      const res = await apiRequest('POST', '/api/registrations', data);
      return res.json();
    },
    onSuccess: () => {
      setIsRegistered(true);
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      queryClient.invalidateQueries({ queryKey: ['/api/events', eventId] });
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "Failed to register for event. Please try again.",
      });
    },
  });

  const onSubmit = (data: RegistrationFormData) => {
    registrationMutation.mutate(data);
  };

  if (isRegistered) {
    return (
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex flex-col items-center text-center space-y-4">
          <CheckCircle2 className="h-16 w-16 text-primary" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Successfully Registered!</h3>
            <p className="text-muted-foreground">
              You're all set for <span className="font-medium text-foreground">{eventTitle}</span>
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Register for Event</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} data-testid="input-student-name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studentEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john.doe@university.edu"
                    {...field}
                    data-testid="input-student-email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student ID</FormLabel>
                <FormControl>
                  <Input placeholder="12345678" {...field} data-testid="input-student-id" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="(555) 123-4567"
                    {...field}
                    value={field.value || ""}
                    data-testid="input-phone"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full" 
            data-testid="button-submit-registration"
            disabled={registrationMutation.isPending}
          >
            {registrationMutation.isPending ? "Registering..." : "Complete Registration"}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
