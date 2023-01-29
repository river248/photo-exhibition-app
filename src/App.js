import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'

import { publicRoutes } from './routes'

function App() {
    return (
        <div>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component

                    let Layout = Fragment

                    if (route.layout) {
                        Layout = route.layout
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    )
                })}
            </Routes>
        </div>
    )
}

export default App
