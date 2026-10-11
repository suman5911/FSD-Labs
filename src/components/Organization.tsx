
import { useState } from "react";
import { roleService } from "../services/roleService";
import type { Role } from "../models/role";
import { RoleForm } from "./RoleForm";

export function Organization() {
    const [organization, setOrganization] =
        useState<Role[]>(() => roleService.getRoles());

    function refreshRoles() {
        setOrganization(roleService.getRoles());
    }

    return (
        <>
            <main className="organization">
                <h2>Organization</h2>

                <div className="organization-list">
                    {organization.map((person) => (
                        <div
                            className="organization-person"
                            key={`${person.firstName}-${person.lastName}-${person.role}`}
                        >
                            <span>
                                {person.firstName} {person.lastName}
                            </span>

                            <span>{person.role}</span>
                        </div>
                    ))}
                </div>
            </main>

            <RoleForm onRoleAdded={refreshRoles} />
        </>
    );
}