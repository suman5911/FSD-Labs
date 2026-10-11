
import type { FormEvent } from "react";
import { useFormInput } from "./useFormInput";
import { roleService } from "../services/roleService";

export function useRoleForm(onRoleAdded: () => void) {
    const firstName = useFormInput();
    const lastName = useFormInput();
    const role = useFormInput();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const result = roleService.createRole(
            firstName.value,
            lastName.value,
            role.value
        );

        firstName.validate(() =>
            result.firstNameError
                ? [result.firstNameError]
                : []
        );

        lastName.validate(() =>
            result.lastNameError
                ? [result.lastNameError]
                : []
        );

        role.validate(() =>
            result.roleError
                ? [result.roleError]
                : []
        );

        if (result.success) {
            firstName.reset();
            lastName.reset();
            role.reset();

            onRoleAdded();
        }
    }

    return {
        firstName,
        lastName,
        role,
        handleSubmit,
    };
}