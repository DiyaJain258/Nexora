Here is a detailed wireframe concept for the complete Smart TV streaming platform, including Android TV, Google TV, Android phones, iPhones, and the web-based admin panel.

### Complete app menus and modules

### 1\. Smart TV application

* Home

* Live TV

* Movies & Series

* Sports

* Kids

* Categories

* Favorites

* TV Guide (EPG)

* Search

* Settings

* My Account / Activation Status

### 2\. Android and iPhone applications

* Home dashboard

* Live TV player

* Channel list and categories

* Movies and series

* TV guide and program schedules

* Search and favorites

* Continue Watching and Watch History

* Profile and subscription status

* Device management

* Notifications and help/support

### 3\. Login and activation

* Welcome / Sign In

* Activation Code

* Account Pending Approval

* Account Activated

* Subscription Expired

* Device Limit Reached

* Contact Support

### 4\. Admin panel

* Dashboard and analytics

* Users and account activation

* Subscription plans and expiry

* Channel management

* Categories and content management

* TV program schedules (EPG)

* Device and session management

* Notifications

* Reports and viewing activity

* Admin users, roles, and permissions

* System settings and support

### 5\. Important features

* Live streaming and full-screen playback

* Adaptive video quality

* Multi-device account access

* Activation and subscription controls

* Favorites and search

* Parental controls

* Error handling and playback recovery

Platform note: Android TV and Google TV can share a compatible TV application, while Android phones and iPhones need their own optimized app experiences. Samsung Tizen, LG webOS, and other TV platforms would need separate compatibility work.

The wireframe above is a visual design reference, not a completed functional application. The final screens should be designed around the client's actual channel source, streaming format, subscription model, and account activation process."use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles";

export function SparklesPreview() {
  return (
    <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
        Aceternity
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
