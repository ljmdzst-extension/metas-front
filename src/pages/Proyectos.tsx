import GeneralPanel from '../components/Panel/GeneralPanel';
import formAExample from '../mock/formAExample.json';

interface formProps {
	title: string;
	index: string;
	SubForm?: formProps[] | null;
}

const sideBarListTest = () => {
	return (
		<div>
			{formAExample.map((form: formProps) => {
				return (
					<div key={form.index}>
						<div>{form.title}</div>

						{form.SubForm && (
							<ul>
								{form.SubForm.map((subForm: formProps) => {
									return (
										<li key={subForm.index}>
											<div>{subForm.title}</div>
										</li>
									);
								})}
							</ul>
						)}
					</div>
				);
			})}
		</div>
	);
};

const contentTest = () => {
	return <div>ContentTest</div>;
};
const Proyectos = () => {
	return <GeneralPanel childrenSidebar={sideBarListTest()} childrenContent={contentTest()} />;
};

export default Proyectos;
