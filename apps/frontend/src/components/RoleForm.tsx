import { useRoleForm } from "../hooks/useRoleForm";

interface RoleFormProps {
    onRoleAdded: () => Promise<void>;
}

export function RoleForm({ onRoleAdded }: RoleFormProps) {
    const { firstName, lastName, role, handleSubmit, submitError } = useRoleForm(onRoleAdded);

    return (
        <section className="employee-form-section">
            <h2>Add Organization Role</h2>
            <form className="employee-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="role-first-name">First Name</label>
                    <input id="role-first-name" type="text" value={firstName.value}
                        onChange={(event) => firstName.changeValue(event.target.value)} />
                    {firstName.messages.map((message) => <p className="validation-error" key={message}>{message}</p>)}
                </div>
                <div>
                    <label htmlFor="role-last-name">Last Name</label>
                    <input id="role-last-name" type="text" value={lastName.value}
                        onChange={(event) => lastName.changeValue(event.target.value)} />
                    {lastName.messages.map((message) => <p className="validation-error" key={message}>{message}</p>)}
                </div>
                <div>
                    <label htmlFor="organization-role">Role</label>
                    <input id="organization-role" type="text" value={role.value}
                        onChange={(event) => role.changeValue(event.target.value)} />
                    {role.messages.map((message) => <p className="validation-error" key={message}>{message}</p>)}
                </div>
                {submitError && <p className="validation-error">{submitError}</p>}
                <button type="submit">Add Role</button>
            </form>
        </section>
    );
}
