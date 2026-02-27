import numpy as np
import matplotlib.pyplot as plt

# Parameters
A = 1
phi = np.pi / 3
t = np.linspace(0, 2*np.pi*2.2, 800)   # time in radians (later mapped to ms)
y = A * np.sin(t)

# Define one cycle
P = 2*np.pi
mask_cycle = (t >= P) & (t <= 2*P)

fig = plt.figure(figsize=(14,4))

# ---- Left: circular motion ----
ax = fig.add_axes([0.02, 0.15, 0.25, 0.7])
theta = np.linspace(0, 2*np.pi, 400)
ax.plot(np.cos(theta), np.sin(theta), linewidth=1.5)
ax.axhline(0)
ax.axvline(0)

ax.plot([0, A*np.cos(phi)], [0, A*np.sin(phi)], linewidth=2)
ax.scatter([A*np.cos(phi)], [A*np.sin(phi)], zorder=3)

#ax.text(A*np.cos(phi)*0.6, A*np.sin(phi)*0.6, "A", fontsize=11)
ax.text(0.05, -0.25, r"$\phi_i = 60^\circ$", fontsize=11)

ax.text(-0.05, 1.15, "y", ha="center")
ax.text(1.1, -0.05, "x", va="center")
#ax.text(0.4, 0.85, r"$\omega$", fontsize=11)

ax.set_aspect("equal")
ax.set_xticks([])
ax.set_yticks([])
ax.set_frame_on(False)

# ---- Right: sinusoidal wave ----
ax2 = fig.add_axes([0.32, 0.15, 0.65, 0.7])

# Full signal
ax2.plot(t*100, y, linewidth=2, color="black")

# Highlighted cycle
ax2.plot(t[mask_cycle]*100, y[mask_cycle], linewidth=3, color="tab:blue")

ax2.axhline(0, color="black", linewidth=1)

# Period arrow (for the highlighted cycle)
ax2.annotate("",
             xy=(P*100, -1.2), xytext=(2*P*100, -1.2),
             arrowprops=dict(arrowstyle="<->", color="tab:blue", linewidth=1.5))

ax2.text(1.5*P*100, 1.05, "Ciclo", color="tab:blue", ha="center", fontsize=11)
ax2.text(1.5*P*100, -1.32, "Período (P)", color="tab:blue", ha="center", fontsize=10)

ax2.set_xlabel("Tiempo [ms]")
ax2.set_ylabel("Amplitud (a)")

ax2.set_yticks([])
ax2.set_xlim(0, t.max()*100)
ax2.set_ylim(-1.35, 1.35)

plt.show()