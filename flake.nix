{
  description = "WPI Humanoid Robot MQP documentation site (Docusaurus)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22 # Docusaurus 3.7 requires Node >= 18; includes npm
          ];

          shellHook = ''
            # Install project dependencies
            if [ ! -d "node_modules" ]; then
              echo "Running npm install..."
              npm install
            fi

            # Put project-local binaries (vite, tsc, eslint...) on PATH.
            export PATH="$PWD/node_modules/.bin:$PATH"
          '';

        };

        formatter = pkgs.nixfmt;
      }
    );
}
