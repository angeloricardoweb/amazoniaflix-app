
import React from 'react'
import { ImageBackground } from 'react-native'

export default function LayoutBackground({ children }: { children: React.ReactNode }) {
    return (
        <ImageBackground source={require('@/assets/images/splash_bg.png')} style={{ flex: 1 }}>
            {children}
        </ImageBackground>
    )
}
