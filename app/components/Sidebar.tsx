"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState("quick-commerce");
  const [isChannelsOpen, setIsChannelsOpen] = useState(true);

  return (
    <div className={styles.mainContainer}>
      {/* Left column with logos */}
      <div className={styles.brandLogosContainer}>
        <div className={styles.mainLogo}>
          <Image
            src="/icons/perfora.svg"
            width={40}
            height={40}
            alt="Perfora"
          />
        </div>
        <div className={styles.otherLogos}>
          <div className={styles.logoItem}>
            <Image
              src="/icons/mama_earth.svg"
              width={35}
              height={35}
              alt="Mama Earth"
            />
          </div>
          <div className={styles.logoItem}>
            <Image
              src="/icons/Zepto Logo.svg"
              width={35}
              height={35}
              alt="Zepto"
            />
          </div>
          <div className={styles.addLogoButton}>
            <span>+</span>
          </div>
        </div>
      </div>

      {/* Main sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.brandContainer}>
          <div className={styles.brandSelector}>
            <div className={styles.userAvatar}>
              <span>SS</span>
            </div>
            <div className={styles.brandName}>Test_brand</div>
            <div className={styles.caretContainer}>
              <Image
                src="/icons/CaretUpDown.svg"
                width={18}
                height={18}
                alt="caret"
              />
            </div>
          </div>
          <div className={styles.collapseButton}>
            <Image
              src="/icons/chevrons-left.svg"
              width={18}
              height={18}
              alt="left-icon"
            />
          </div>
        </div>

        <div className={styles.navigation}>
          <Link href="/" className={styles.navItem}>
            <Image
              src={"/icons/home.svg"}
              width={20}
              height={20}
              alt="home-icon"
            />
            <span>Overview</span>
          </Link>

          <div className={styles.navGroup}>
            <div
              className={styles.navItem}
              onClick={() => setIsChannelsOpen(!isChannelsOpen)}
            >
              <Image
                src={"/icons/channels.svg"}
                width={20}
                height={20}
                alt="channels-icon"
              />
              <span>Channels</span>
              <div className={styles.channelIcon}>
                <Image
                  src={"/icons/arrow_down.svg"}
                  width={14}
                  height={14}
                  alt="down_icon"
                />
              </div>
            </div>

            {isChannelsOpen && (
              <div className={styles.subMenu}>
                <Link href="/meta-ads" className={styles.subItem}>
                  Meta Ads
                </Link>
                <Link href="/google-ads" className={styles.subItem}>
                  Google Ads
                </Link>
                <Link
                  href="/quick-commerce"
                  className={`${styles.subItem} ${
                    activeTab === "quick-commerce" ? styles.active : ""
                  }`}
                >
                  Quick Commerce
                </Link>
              </div>
            )}
          </div>

          <Link href="/creatives" className={styles.navItem}>
            <Image
              src={"/icons/creatives.svg"}
              width={20}
              height={20}
              alt="creatives-icon"
            />
            <span>Creatives</span>
          </Link>
        </div>

        <div className={styles.bottomNav}>
          <Link href="/help" className={styles.navItem}>
            <Image
              src={"/icons/help.svg"}
              width={20}
              height={20}
              alt="help-icon"
            />
            <span>Help</span>
          </Link>
          <Link href="/settings" className={styles.navItem}>
            <Image
              src={"/icons/Settings.svg"}
              width={20}
              height={20}
              alt="settings-icon"
            />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
