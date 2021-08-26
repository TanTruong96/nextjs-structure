import { Button, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import languageActions from 'src/redux/language/actions';
const { changeLanguage } = languageActions;

function LanguageSwitcher() {

	const dispatch = useDispatch();

	function handleMenuClick(e) {
		dispatch(changeLanguage(e.key))
	}

	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="vietnamese">Vietnamese</Menu.Item>
			<Menu.Item key="english">English</Menu.Item>
		</Menu>
	);

	return (
		<div style={{ marginTop: '50px', marginBottom: '50px' }}>

			<Dropdown overlay={menu}>
				<Button>
					Ngôn ngữ <DownOutlined />
				</Button>
			</Dropdown>
		</div>
	)
}
export default LanguageSwitcher;