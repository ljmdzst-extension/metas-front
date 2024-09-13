import {
	FormArSecUU,
	FormDescriptionUbication,
	FormDocuments,
	FormMetas,
	FormObjetiveEst,
	FormOrgInst,
	FormPeriodo,
	FormPIE,
} from '../../Forms';

type FormSwitcherProps = {
	indexForm: string;
};

const FORM_TYPES = {
	DESCR: 'descr',
	DOCUMENTACION: 'documentacion',
	PIE: 'pie',
	AREA: 'area',
	PERIODO: 'periodo',
	OBJETIVO: 'objetivo',
	ORGANI: 'organi',
	METAS: 'metas',
};

const FormSwitcher = ({ indexForm }: FormSwitcherProps) => {
	switch (indexForm) {
		case FORM_TYPES.DESCR:
			return <FormDescriptionUbication />;
		case FORM_TYPES.DOCUMENTACION:
			return <FormDocuments />;
		case FORM_TYPES.PIE:
			return <FormPIE />;
		case FORM_TYPES.AREA:
			return <FormArSecUU />;
		case FORM_TYPES.PERIODO:
			return <FormPeriodo />;
		case FORM_TYPES.OBJETIVO:
			return <FormObjetiveEst />;
		case FORM_TYPES.ORGANI:
			return <FormOrgInst />;
		case FORM_TYPES.METAS:
			return <FormMetas />;
		default:
			return null;
	}
};

export default FormSwitcher;
