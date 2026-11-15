
import { useState } from "react";

export function useFormInput(initialValue = "") {
    const [value, setValue] = useState(initialValue);
    const [messages, setMessages] = useState<string[]>([]);

    function changeValue(newValue: string) {
        setValue(newValue);
        setMessages([]);
    }

    function validate(
        callback: (input: string) => string[]
    ) {
        const results = callback(value);
        setMessages(results);
        return results;
    }

    function reset() {
        setValue(initialValue);
        setMessages([]);
    }

    return {
        value,
        messages,
        changeValue,
        validate,
        reset,
    };
}
