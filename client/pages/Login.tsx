import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Mail, Lock, ArrowLeft } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-pink/5 rounded-full blur-[120px] -z-10" />

      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors">
        <ArrowLeft size={18} /> Retour à l'accueil
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-10 bg-glass rounded-[2.5rem] border border-white/10"
      >
        <div className="text-center mb-10">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F41ba66cdc7114e4ab014f35ba81e151e%2F4a571026c7964f629c370968e15765de?format=webp&width=100&height=100"
            alt="Kernel Forge"
            className="w-16 h-16 mx-auto mb-4 object-contain"
          />
          <h1 className="text-3xl font-bold mb-2 text-gradient">BIENVENUE</h1>
          <p className="text-foreground/60">Connectez-vous à votre espace Kernel Forge</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
              <Input id="email" placeholder="votre@email.com" className="pl-10 h-12 bg-white/5 border-white/10" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Mot de passe</Label>
              <Link to="/forgot" className="text-xs text-primary hover:underline">Oublié ?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
              <Input id="password" type="password" placeholder="••••••••" className="pl-10 h-12 bg-white/5 border-white/10" />
            </div>
          </div>

          <Button className="w-full h-12 bg-gradient-to-r from-primary to-[#ff0080] rounded-xl font-bold">
            Se Connecter
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-foreground/40">Ou continuer avec</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-white/10 hover:bg-white/5">
              <Github className="mr-2" size={18} /> GitHub
            </Button>
            <Button variant="outline" className="border-white/10 hover:bg-white/5">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="mr-2 w-4 h-4" alt="Google" /> Google
            </Button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-foreground/40">
          Pas encore de compte ? <Link to="/signup" className="text-primary hover:underline font-medium">S'inscrire</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
