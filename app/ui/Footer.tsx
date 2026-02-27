import React from "react";
import '@/app/ui/styles/homeFooter.css';
import { Lightbulb } from "lucide-react";
import Logo from "@/app/ui/Logo";

const Footer: React.FC = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-brand">
                    <Logo size={24} />
                    {/* <div className="footer-logo">
                        <h1>Lumina</h1>
                        <Lightbulb
                        className="logo-icon" 
                        size={28} 
                        strokeWidth={2} 
                        />
                    </div> */}
                    <p>Empowering University Students with AI-Driven Personalized Learning</p>
                </div>
                <div className="footer-product">
                    <h3>Product</h3>
                    <a href="#">Home</a>
                    <a href="#">Domains</a>
                    <a href="#">Courses</a>
                </div>
                <div className="footer-resources">
                    <h3>Resources</h3>
                    <a href="#">Blog</a>
                    <a href="#">Help Center</a>
                    <a href="#">Contact Us</a>
                </div>
                <div className="footer-devlopers">
                    <h3>Developers</h3>
                    <a href="#">API Documentation</a>
                    <a href="#">Open Source</a>
                    <a href="#">GitHub</a>
                </div>
                <div className="footer-company">
                    <h3>Company</h3>
                    <a href="#">About Us</a>
                    <a href="#">Careers</a>
                    <a href="#">Press</a>
                </div>
            </div>
            <div className="footer-copyrights">
                <hr />
                <p>&copy; 2026 Lumina. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
