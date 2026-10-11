import { createFormHook } from "@tanstack/react-form";

import {
	Form,
	FormInput,
	FormSubmitButton,
	FormTextarea,
	fieldContext,
	formContext,
} from "../components/form";

export const { useAppForm, withForm, useTypedAppFormContext } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		FormInput,
		FormTextarea,
	},
	formComponents: {
		Form,
		FormSubmitButton,
	},
});
