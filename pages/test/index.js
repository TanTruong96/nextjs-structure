import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head'
import Link from 'next/link'
import commonAtions from 'src/redux/common/actions';
import { wrapper } from 'src/redux/store';
import { END } from 'redux-saga'
import { Button, Spin } from 'antd'
import IntlMessages from 'lang/IntlMessages'
import LanguageSwitcher from 'src/components/LanguageSwitcher'

const domain = process.env.NEXT_PUBLIC_DOMAIN_API;
const { getProvinces, getVersionApi } = commonAtions;


function Test(props) {

    const [detail, setDetail] = useState({});
    const { provinces, versionApi } = useSelector(state => state.Common);

    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(getProvinces());
    }, []);
    useEffect(() => {
        if (provinces.length > 0)
            setDetail(provinces[0]);

    }, [provinces]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Head>
                <title>Version: {versionApi}</title>
                <meta name="description" key="description" content="Trang web học tiếng anh vượt trên cả top đầu Việt Nam" />
                {/* <meta property="og:title" key="og:title" content={`Việc Làm Đại Việt | ${companyDetail.fullName}`} /> */}
                {/* <meta property="og:description" key="og:description" content={companyDetail.summary} /> */}
                {/* <meta property="og:image" key="og:image" content={companyDetail.coverImage} /> */}
            </Head>
            <Button type="primary">Ant design button {props.name}</Button>
            <p className="nhankendu"><IntlMessages id="test.style.content" /></p>
            <IntlMessages id="login.login" />

            <LanguageSwitcher />

            <p><IntlMessages id="common.version" />: {versionApi}</p>
        </div>
    )
}

//#region WORK WELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL

export const getStaticProps = wrapper.getStaticProps(
    async ({ store, preview }) => {
        // regular stuff
        store.dispatch(getProvinces())
        store.dispatch(getVersionApi())

        // end the saga
        store.dispatch(END);
        await store.sagaTask.toPromise();
    }
);

// Test.getInitialProps = ({store, pathname, query}) => {
//     console.log("getserversidepropsxxx ")
//     store.dispatch(getProvinces()) // The component can read from the store's state when rendered
//     // return {}; // You can pass some custom props to the component from here
// }

//#endregion


//#region NOT WORKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK

// export const getServerSideProps = wrapper.getServerSideProps(
//     async ({store, req, res, ...etc }) => {
//         // regular stuff
//         store.dispatch(getProvinces())
//         // end the saga
//         store.dispatch(END);
//         await store.sagaTask.toPromise();
//     }
// );

//#endregion

export default Test;