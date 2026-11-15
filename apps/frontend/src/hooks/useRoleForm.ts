import { useState, type FormEvent } from "react";
import { useFormInput } from "./useFormInput";
import { roleService } from "../services/roleService";

export function useRoleForm(onRoleAdded: () => Promise<void>) {
    const firstName = useFormInput();
    const lastName = useFormInput();
    const role = useFormInput();
    const [submitError, setSubmitError] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitError("");
        try {
            const result = await roleService.createRole(firstName.value, lastName.value, role.value);
            firstName.validate(() => result.firstNameError ? [result.firstNameError] : []);
            lastName.validate(() => result.lastNameError ? [result.lastNameError] : []);
            role.validate(() => result.roleError ? [result.roleError] : []);
            if (result.success) {
                firstName.reset();
                lastName.reset();
                role.reset();
                await onRoleAdded();
            }
        } catch {
            setSubmitError("Could not save role. Check that the back-end is running.");
        }
    }

    return { firstName, lastName, role, handleSubmit, submitError };
}
