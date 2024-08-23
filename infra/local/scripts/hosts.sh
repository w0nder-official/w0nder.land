grep -q "127.0.0.1 w0nder.work" /etc/hosts || echo -e "\n127.0.0.1 w0nder.work" | sudo tee -a /etc/hosts
